

export async function uploadReceiptToCloudflare({ image, token, contentType }) {
    if (!image) {
        throw new Error("No image selected");
    }

    let  uploadUrl:string, fileKey:string, publicUrl:string, error 

    try {
        console.log("Asking backend for signed upload URL...")
        const metadataRes = await fetch("http://10.0.0.45:5000/api/receipts/get-signed-upload-url", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                filename: image.split("/").pop(),
                content_type: contentType,
            }),
        });
        const metadataData = await metadataRes.json();
        console.log("Backend Response:", metadataData);
        ({ uploadUrl, fileKey, publicUrl, error } = metadataData);
        console.log("Items received from backend: ", uploadUrl, fileKey, publicUrl)
    } catch(err) {
        console.error("Error fatchin signed URL: ", err)
        throw err
    }
        if (!uploadUrl) {
            throw new Error(error || "Failed to get signed URL");
        }
        let blob;
    try{
        console.log("Converting local file URI → blob")
        const response = await fetch(image);
        blob = await response.blob();
        console.log("Blob ready for upload:", blob);
    } catch (err) {
        console.error("Failed to create blob:", err);
        throw err;
    }

    try{
        console.log(" Uploading to Cloudflare...")
        const uploadRes = await fetch(uploadUrl, {
            method: "PUT",
            body: blob,
            headers: {
                "Content-Type": contentType,
            },
        });

        if (!uploadRes.ok) {
            throw new Error("Upload to Cloudflare failed");
        }
        console.log("Upload successful!");

        // 4️⃣ Return the file key so it can be saved in DB
        return {fileKey, publicUrl};

    } catch (err) {
        console.error("Upload error:", err);
        throw err; // let caller handle it
    }
}
