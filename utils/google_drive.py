"""Utility functions for interacting with Google Drive."""

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

SCOPES = ["https://www.googleapis.com/auth/drive.file"]


def upload_file(service_account_file: str, file_path: str, folder_id: str) -> str:
    credentials = service_account.Credentials.from_service_account_file(
        service_account_file, scopes=SCOPES
    )
    service = build("drive", "v3", credentials=credentials)
    file_metadata = {"name": file_path.split("/")[-1], "parents": [folder_id]}
    media = MediaFileUpload(file_path)
    uploaded = (
        service.files()
        .create(body=file_metadata, media_body=media, fields="id")
        .execute()
    )
    file_id = uploaded.get("id")
    return f"https://drive.google.com/uc?id={file_id}"
