"use client";
import React, { FC, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Autoformat,
  Bold,
  Italic,
  Underline,
  BlockQuote,
  CloudServices,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
  Indent,
  IndentBlock,
  Link,
  List,
  Font,
  Mention,
  Paragraph,
  PasteFromOffice,
  Table,
  TableColumnResize,
  TableToolbar,
  TextTransformation,
  SourceEditing,
  MediaEmbed,
  Alignment,
  SimpleUploadAdapter,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

interface CkEditorProps {
  editorData: string;
  handleOnUpdateCKEditor: (editor: string) => void;
}

const CkEditor: FC<CkEditorProps> = ({ editorData, handleOnUpdateCKEditor }) => {
  // Hàm lấy giá trị cookie
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  // Lấy token từ cookie
  const token = getCookie("token");

  useEffect(() => { }, [editorData]);

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        licenseKey: "GPL",
        plugins: [
          Autoformat,
          BlockQuote,
          Bold,
          CloudServices,
          Essentials,
          Heading,
          Image,
          ImageCaption,
          ImageResize,
          ImageStyle,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          Font,
          List,
          Mention,
          Paragraph,
          PasteFromOffice,
          PictureEditing,
          Table,
          TableColumnResize,
          TableToolbar,
          TextTransformation,
          Underline,
          SourceEditing,
          MediaEmbed,
          Alignment,
          SimpleUploadAdapter,
        ],
        toolbar: [
          "undo",
          "redo",
          "|",
          "heading",
          "|",
          "bold",
          "italic",
          "underline",
          "|",
          "alignment",
          "link",
          "uploadImage",
          "insertTable",
          "blockQuote",
          "|",
          "fontFamily",
          "fontSize",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "bulletedList",
          "numberedList",
          "|",
          "outdent",
          "indent",
          "|",
          "mediaEmbed",
          "|",
          "sourceEditing",
        ],
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6",
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6",
            },
          ],
        },
        image: {
          resizeOptions: [
            {
              name: "resizeImage:original",
              label: "Default image width",
              value: null,
            },
            {
              name: "resizeImage:50",
              label: "50% page width",
              value: "50",
            },
            {
              name: "resizeImage:75",
              label: "75% page width",
              value: "75",
            },
          ],
          toolbar: [
            "imageTextAlternative",
            "toggleImageCaption",
            "|",
            "imageStyle:inline",
            "imageStyle:wrapText",
            "imageStyle:breakText",
            "|",
            "resizeImage",
          ],
        },
        fontColor: {
          colors: [
            {
              color: "hsl(0, 0%, 0%)",
              label: "Black",
            },
            {
              color: "hsl(0, 0%, 30%)",
              label: "Dim grey",
            },
            {
              color: "hsl(0, 0%, 60%)",
              label: "Grey",
            },
            {
              color: "hsl(0, 0%, 90%)",
              label: "Light grey",
            },
            {
              color: "hsl(0, 0%, 100%)",
              label: "White",
              hasBorder: true,
            },
            {
              color: "hsl(0, 75%, 60%)",
              label: "Red",
            },
            {
              color: "hsl(30, 75%, 60%)",
              label: "Orange",
            },
            {
              color: "hsl(60, 75%, 60%)",
              label: "Yellow",
            },
            {
              color: "hsl(90, 75%, 60%)",
              label: "Light green",
            },
            {
              color: "hsl(120, 75%, 60%)",
              label: "Green",
            },
            {
              color: "hsl(220, 100%, 50%)",
              label: "Blue",
            },
            {
              color: "hsl(270, 60%, 50%)",
              label: "Violet",
            },
          ],
        },
        fontBackgroundColor: {
          colors: [
            {
              color: "hsl(0, 75%, 60%)",
              label: "Red",
            },
            {
              color: "hsl(30, 75%, 60%)",
              label: "Orange",
            },
            {
              color: "hsl(60, 75%, 60%)",
              label: "Yellow",
            },
            {
              color: "hsl(90, 75%, 60%)",
              label: "Light green",
            },
            {
              color: "hsl(120, 75%, 60%)",
              label: "Green",
            },
            {
              color: "hsl(0, 0%, 0%)",
              label: "Black",
            },
            {
              color: "hsl(0, 0%, 30%)",
              label: "Dim grey",
            },
            {
              color: "hsl(0, 0%, 60%)",
              label: "Grey",
            },
            {
              color: "hsl(0, 0%, 90%)",
              label: "Light grey",
            },
          ],
        },
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
        },
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
        },
        fontSize: {
          options: [8, 12, "default", 16, 18, 24, 36],
        },
        mediaEmbed: {
          previewsInData: true,
        },
        simpleUpload: {
          uploadUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}upload`,
          headers: {
            Authorization: `Bearer ${token}`, // Lấy token từ cookie
          },
        },
        initialData: editorData,
      }}
      onChange={(_event, editor) => {
        const data = editor.getData();
        handleOnUpdateCKEditor(data);

      }}
    />
  );
};

export default CkEditor;
