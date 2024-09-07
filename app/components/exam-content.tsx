import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Book, Calendar, Clock, Phone, User } from "lucide-react";
import { InlineMath } from "react-katex";

interface Part {
  letter: string;
  description: string;
}

interface Task {
  task_number: number;
  title: string;
  description?: string;
  parts?: Part[];
}

interface Exam {
  name: string;
  date: string;
  time: string;
  language: string;
  allowed_aids: string;
  instructor: string;
  tasks: Task[];
}

export default function ExamContent({ examData }: { examData: Exam }) {
  const exam = examData;
  console.log(exam, "RIGHT BEFORE EXAM CONTENT");
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{exam.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 mb-6">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{exam.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>{exam.time}</span>
          </div>
          <div className="flex items-center">
            <Book className="mr-2 h-4 w-4" />
            <span>Språk: {exam.language}</span>
          </div>
          <div className="flex items-start">
            <Book className="mr-2 h-4 w-4 mt-1" />
            <span>Tillatte hjelpemidler: {exam.allowed_aids}</span>
          </div>
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Faglærer: {exam.instructor.split(", ")[0]}</span>
            <Phone className="ml-4 mr-2 h-4 w-4" />
            <span>{exam.instructor.split(", ")[1]}</span>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-6">
          {exam.tasks.map((task) => (
            <Card key={task.task_number}>
              <CardHeader>
                <CardTitle className="text-lg">
                  Oppgave {task.task_number}: {task.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {task.description && (
                  <p className="mb-4">
                    <InlineMath>{task.description}</InlineMath>
                  </p>
                )}
                {task.parts && task.parts.length > 0 && (
                  <ol className="list-[lower-alpha] pl-5 space-y-2">
                    {task.parts.map((part) => (
                      <li key={part.letter}>
                        <span className="font-medium">{part.letter} </span>
                        {part.description}
                      </li>
                    ))}
                  </ol>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
