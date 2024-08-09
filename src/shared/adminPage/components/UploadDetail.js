import React, { useState } from "react";
import axios from "axios";
import AdminButtonGrey from "../../../components/adminPage/AdminButtonGrey";
import * as S from "./UploadImageBoxStyle";

const UploadDetail = ({ onFileChange }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [detailUrls, setDetailUrls] = useState([]);
  const [fileSelectedMessage, setFileSelectedMessage] = useState("");
  const [fileBasicMessage, setFileBasicMessage] = useState(
    "여러 장일 경우 일괄 선택 해주세요."
  );

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
    setFileBasicMessage("");
    setFileSelectedMessage("😀업로드 버튼을 꼭 눌러주세요😀");
  };

  const handleUpload = async () => {
    if (!selectedFiles) {
      setFileSelectedMessage("이미지가 선택되지 않았습니다.");
      setFileBasicMessage("");
      return;
    }

    try {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("detailUrls", selectedFiles[i]); // 필드 이름을 "detailUrls"로 설정
      }

      const response = await axios.post(
        "/api/admin/products/add/detail",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const detailUrls = response.data.detailUrls;
      setDetailUrls(detailUrls);
      onFileChange(detailUrls);
      setFileSelectedMessage("😀아래에서 상세 이미지를 확인해보세요😀");
    } catch (error) {
      console.error("response.data이미지 업로드 실패", error);
      console.error("response 이미지 업로드 실패", error);
    }
  };

  return (
    <S.ImageUploadWrapper>
      <S.DetailBox>
        <p>{fileBasicMessage}</p>
        <p>{fileSelectedMessage}</p>
      </S.DetailBox>
      <S.ImageBtnWrapper>
        <div style={{ position: "relative" }}>
          <S.FileTypeRightInput
            type="file"
            multiple
            onChange={handleFileChange}
          />
          <S.FileSelectBtn>파일 선택</S.FileSelectBtn>
        </div>
        <AdminButtonGrey onClick={handleUpload}>
          상세사진 업로드
        </AdminButtonGrey>
      </S.ImageBtnWrapper>

      <div>
        {detailUrls.length > 0 && (
          <div style={{ marginTop: "10px", marginLeft: "20px" }}>
            {detailUrls.map((url, index) => (
              <div key={index}>
                <img
                  src={url}
                  alt={`Detail ${index}`}
                  style={{ width: "300px", height: "auto" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </S.ImageUploadWrapper>
  );
};

export default UploadDetail;
