"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import pdfToText from "react-pdftotext";

export const ExtractText = async (event: any) => {
  //const [text, setText] = useState<string | null>(null);

  const file = event.target.files[0];
  try {
    const text = await pdfToText(file);
    console.log(text, "text");
    const res = await fetch("api/message", {
      method: "POST",
      body: JSON.stringify({ content: text }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      alert("Failed to extract text from pdf");
      return;
    }
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("Failed to extract text from pdf");
  }

  /*
  const file = event.target.files[0];
  pdfToText(file)
    .then((text) => setText(text))
    .catch((error) => console.error("Failed to extract text from pdf"));

  const res = await fetch("api/message", {
    method: "POST",
    body: JSON.stringify({ content: text }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    alert("Failed to extract text from pdf");
    return;
  }
  const data = await res.json();
  console.log(data);
  */
};

export function InputFile() {
  const [image, setImage] = useState<string | null>(null);
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input
        className="cursor-pointer"
        onChange={ExtractText}
        id="picture"
        type="file"
      />
      {image && (
        <Image
          src={image}
          alt="Picture"
          width={100}
          height={100}
          className="rounded-md"
        />
      )}
    </div>
  );
}
