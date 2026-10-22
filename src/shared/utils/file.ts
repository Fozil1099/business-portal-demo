import { http } from "@/app/providers/axios/http";

export const downloadFile = (url: string) => {
  http.getFile(url).then((blob) => {
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = url.split("/").pop() || "file";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  });
};
