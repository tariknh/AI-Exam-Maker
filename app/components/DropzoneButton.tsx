"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import pdfToText from "react-pdftotext";
import ExamContent from "./exam-content";

export const ExtractText = async (event: any) => {
  //const [text, setText] = useState<string | null>(null);

  const file = event.target.files[0];
  try {
    const text = await pdfToText(file);

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
    console.log(typeof data, "TYPE OF DATA");
    return data;
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

interface Exam {
  exam: {
    university?: string;
    faculty?: string;
    course: string; // Antar at course alltid vil være tilstede
    date?: string;
    time?: string;
    language?: string;
    allowed_materials?: string;
    teacher?: string;
    teacher_phone?: string;
    tasks: {
      task_number: number;
      description: string;
      subtasks?: {
        subtask_letter: string;
        description: string;
      }[];
    }[];
  };
}

function ExamContentOld({ examData }: { examData: Exam }) {
  const { exam } = examData;

  return (
    <div className="exam-container">
      <h1 className="exam-title">{exam.course}</h1>
      <p className="exam-info">
        {exam.university && `${exam.university} - `}{" "}
        {/* Vis universitet bare hvis det finnes */}
        {exam.faculty} <br />
        {exam.date} | {exam.time} <br />
        {exam.language && `Språk: ${exam.language} <br />`}
        {exam.allowed_materials &&
          `Tillatte hjelpemidler: ${exam.allowed_materials} <br />`}
        {exam.teacher && `Faglærer: ${exam.teacher} `}
        {exam.teacher_phone && `(${exam.teacher_phone})`}
      </p>

      <ol className="task-list">
        {exam.tasks.map((task) => (
          <li key={task.task_number} className="task">
            <h2 className="task-number">Oppgave {task.task_number}</h2>
            <p className="task-description">{task.description}</p>

            {task.subtasks && task.subtasks.length > 0 && (
              <ol className="subtask-list" type="a">
                {task.subtasks.map((subtask) => (
                  <li key={subtask.subtask_letter} className="subtask">
                    <span className="subtask-letter">
                      {subtask.subtask_letter}
                    </span>{" "}
                    {subtask.description}
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

const fakeExam = {
  name: "MAT100 Matematiske metoder 1",
  date: "21. februar, 2024",
  time: "9:00-14:00 (5 timer)",
  language: "Norsk, Bokmål",
  allowed_aids:
    "K. Rottmann, Matematisk formelsamling. Enkel, godkjent kalkulator + Casio fx-85EX Classwiz.",
  instructor: "Sigbjørn Hervik, tlf: 41581800",
  tasks: [
    {
      task_number: 1,
      title: "Komplekse tall",
      parts: [
        {
          letter: "a)",
          description:
            "Gitt \\(z = 3 + 5i\\) og \\(w = 2 - 3i\\). Regn ut \\(zw\\), \\(\\overline{w}^2\\) og \\(\\frac{z}{w}\\).",
        },
        {
          letter: "b)",
          description:
            "Finn alle 3. røttene til \\(2 - 2i\\). Skriv de på kartesisk form og tegn de inn i det komplekse planet.",
        },
        {
          letter: "c)",
          description:
            "La \\(a\\) være et reellt tall. For hvilke verdier av \\(a\\) er uttrykket \\(\\frac{a + 7i}{3 - 4i}\\) reellt?",
        },
      ],
    },
    {
      task_number: 2,
      title: "Integrasjon",
      parts: [
        {
          letter: "a)",
          description: "\\(\\int (3x^2 + \\sqrt{x} - 2\\sin(2x)) \\, dx\\).",
        },
        {
          letter: "b)",
          description: "\\(\\int (x + 1)e^x \\, dx\\).",
        },
        {
          letter: "c)",
          description: "\\(\\int \\frac{3x - 2}{(x^2 + 4)(x + 2)} \\, dx\\).",
        },
        {
          letter: "d)",
          description: "\\(\\int x\\sqrt{x - 2} \\, dx\\).",
        },
      ],
    },
    {
      task_number: 3,
      title: "tan(\\(\\theta\\)/2)-substitusjon",
      description:
        "Bruk tan(\\(\\theta\\)/2)-substitusjonen til å beregne det ubestemte integralet \\(I = \\int \\frac{1}{\\sin \\theta} \\, d\\theta\\).",
    },
    {
      task_number: 4,
      title: "Funksjonsanalyse",
      description: "La \\(f(x) = (\\ln x)^2 - 4\\ln x + 3\\), \\(x > 0\\).",
      parts: [
        {
          letter: "a)",
          description:
            "Bestem monotoniegenskapene til \\(f(x)\\), og alle topp- og bunnpunkt.",
        },
        {
          letter: "b)",
          description:
            "Bestem krumningsegenskapene til \\(f(x)\\), og eventuelle vendepunkter.",
        },
        {
          letter: "c)",
          description:
            "Finn ligningene for tangenten og normalen til \\(f\\) i punktet \\((e, f(e))\\).",
        },
      ],
    },
    {
      task_number: 5,
      title: "Differensialligninger og grenseverdier",
      parts: [
        {
          letter: "a)",
          description:
            "Løs initialverdiproblemet \\(y' + \\frac{4}{x}y = x^2\\), \\(y(1) = 3\\).",
        },
        {
          letter: "b)",
          description:
            "Finn \\(b\\) slik at: \\(\\lim_{x \\to 0} \\frac{x \\sin(bx)}{x + 1 - e^x} = 2024\\).",
        },
        {
          letter: "c)",
          description:
            "La \\(D\\) være området begrenset av \\(f(x) = \\ln x\\), \\(x = 3\\) og \\(x\\)-aksen. Bestem volumet av omdreiningslegmet som fremkommer ved å dreie \\(D\\) om \\(y\\)-aksen.",
        },
      ],
    },
    {
      task_number: 6,
      title: "Jotaros akvarium",
      description:
        "Jotaros akvarium har dessverre fått litt for høyt saltinnhold. For øyeblikket er saltinnholdet på 5%, som er for høyt. Jotaro (og Star Platinum) har derfor et filter som filtrerer ut saltet i vannet. \n\nAkvariet inneholder totalt 300 kg saltvann, hvorav 5% er salt, før han starter å filtrere vannet. \n\nVi antar at filteret filtrerer 1.5kg saltvann per minutt. Vi antar at hvis \\(m(t)\\) er mengden salt (i kg) ved tiden \\(t\\) (i minutter) så vil den oppfylle initialverdiproblemet: \\(\\frac{dm}{dt} = -\\frac{m}{200}\\), \\(m(0) = 15\\).",
      parts: [
        {
          letter: "a)",
          description: "Løs dette initialverdiproblemet og finn \\(m(t)\\).",
        },
        {
          letter: "b)",
          description:
            "Jotaro trenger at saltnivået kommer ned til 3.5%. Hvor lang tid tar dette?",
        },
      ],
    },
  ],
};

export function InputFile() {
  const [image, setImage] = useState<string | null>(null);
  const [exam, setExam] = useState<any | null>(null);

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input
          className="cursor-pointer"
          onChange={async (e) => {
            const newExam = ExtractText(e);
            const result = await newExam;
            console.log(result, "RESULT");
            const cleanedString = result.replace(/```json|```/g, "");

            // Parse the cleaned string into a JSON object
            console.log(cleanedString, "CLEANED STRING");
            console.log(typeof cleanedString, "TYPE OF CLEANED STRING");
            const parsedData = JSON.parse(cleanedString);

            setExam(parsedData);
          }}
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
      {exam && (
        <>
          <ExamContent examData={exam} />
        </>
      )}
      {fakeExam && (
        <>
          <ExamContent examData={fakeExam} />
        </>
      )}
    </>
  );
}
