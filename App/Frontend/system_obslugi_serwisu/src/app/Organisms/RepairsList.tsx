"use client"

import {RepairItem} from "@/app/Molecules/RepairItem";
import {useQuery} from "@apollo/client/react";
import {GET_CUSTOMER_REPAIRS} from "@/graphql/GetCustomerRepairs";
import {GetCustomerRepairsQuery, GetCustomerRepairsQueryVariables} from "@/__generated__/types";
import {LoadingIcon} from "@/app/Molecules/LoadingIcon";
import {PageSelector} from "@/app/Molecules/PageSelector";
import {useState} from "react";

type Repair = GetCustomerRepairsQuery["me"]["repairs"]["items"][number];

const ManualUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadUrl, setUploadUrl] = useState("");
    const [status, setStatus] = useState("idle"); // idle | uploading | success | error

    // 1. Handle File Selection
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            setStatus("idle");
        }
    };

    // 2. Handle URL Input
    const handleUrlChange = (e) => {
        setUploadUrl(e.target.value);
    };

    // 3. Perform the Upload
    const handleUpload = async () => {
        if (!selectedFile || !uploadUrl) {
            alert("Please select a file and enter a URL");
            return;
        }

        setStatus("uploading");

        try {
            // IMPORTANT: For S3 Presigned URLs, we usually use PUT
            // and send the raw file as the body.
            const response = await fetch(uploadUrl, {
                method: "PUT",
                headers: {
                    // S3 might require the Content-Type to match what you signed
                    "Content-Type": selectedFile.type,
                },
                body: selectedFile,
            });

            if (response.ok) {
                setStatus("success");
            } else {
                console.error("Upload failed", response);
                setStatus("error");
            }
        } catch (error) {
            console.error("Network error", error);
            setStatus("error");
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", fontFamily: "sans-serif" }}>
            <h3>Test S3 Upload</h3>

            {/* URL Input Field */}
            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    Destination URL (Paste Presigned Link):
                </label>
                <input
                    type="text"
                    value={uploadUrl}
                    onChange={handleUrlChange}
                    placeholder="https://s3.amazonaws.com/..."
                    style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                />
            </div>

            {/* File Input Field */}
            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    Select Image:
                </label>
                <input type="file" onChange={handleFileChange} />
            </div>

            {/* Upload Button */}
            <button
                onClick={handleUpload}
                disabled={status === "uploading"}
                style={{
                    padding: "10px 20px",
                    backgroundColor: status === "uploading" ? "#ccc" : "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: status === "uploading" ? "not-allowed" : "pointer",
                }}
            >
                {status === "uploading" ? "Uploading..." : "Send File"}
            </button>

            {/* Status Messages */}
            {status === "success" && (
                <p style={{ color: "green", marginTop: "10px" }}>✅ Upload Successful!</p>
            )}
            {status === "error" && (
                <p style={{ color: "red", marginTop: "10px" }}>❌ Upload Failed. Check console.</p>
            )}
        </div>
    );
};

export function RepairsList(){
    const [currentPage, setCurrentPage] = useState<number>(1)
    const {data, loading, error} = useQuery<GetCustomerRepairsQuery,
        GetCustomerRepairsQueryVariables>(GET_CUSTOMER_REPAIRS, {variables:{
            pageNumber: currentPage,
            pageSize: 5,
        }});

    if(loading) return <LoadingIcon/>
    if(error) return <p>ERROR</p>
    if(!data) return <p>ERROR</p>

    const repairs = data.me.repairs.items;

    return (
        <>
            <div className="flex flex-col gap-5 w-full">
                <ManualUpload />
                {repairs.map((repair: Repair, repairNumber:number) => (
                    <RepairItem key={repairNumber} repair={repair}/>
                ))}
            </div>
            <PageSelector totalPages={data.me.repairs.totalPages} currentPage={currentPage} onPageChange={(page)=>setCurrentPage(page)}/>
        </>
    )
}