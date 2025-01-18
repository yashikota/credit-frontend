import { signOut } from "@hono/auth-js/react";
import { useLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import type { Data } from "~/types/data";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const origin = url.origin;
  const cookie = request.headers.get("cookie");
  try {
    const res = await fetch(`${origin}/api/data`, {
      headers: {
        cookie: cookie || "",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Failed to fetch", e);
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred";
    return { error: errorMessage };
  }
}

export default function Index() {
  const Data = useLoaderData() as Data[];

  return (
    <div className="w-screen flex flex-col">
      <div className="w-full flex flex-1 flex-col items-center justify-center overflow-clip p-4">
        <div>
          <Button
            className="flex items-center gap-x-1"
            onClick={() => signOut()}
          >
            Logout
          </Button>
          {Data.map((d) => (
            <div
              className="border border-gray-200 rounded-md p-4 my-4"
              key={d.numbering}
            >
              <p>YEAR: {d.year}</p>
              <p>Faculty: {d.faculty}</p>
              <p>Department: {d.department}</p>
              <p>Term: {d.term}</p>
              <p>Original Syllabus URL: {d.original_syllabus_url}</p>
              <p>Syllabus App URL: {d.syllabus_app_url}</p>
              <p>Numbering: {d.numbering}</p>
              <p>Lecture Title: {d.lecture_title}</p>
              <p>Instructor: {d.person}</p>
              <p>Enrollment: {d.enrollment}</p>
              <p>Respondents: {d.respondent}</p>
              <p>Question 1: {d.question1}</p>
              <p>Question 2: {d.question2}</p>
              <p>Question 3: {d.question3}</p>
              <p>Question 4: {d.question4}</p>
              <p>Question 5: {d.question5}</p>
              <p>Question 6: {d.question6}</p>
              <p>Question 7: {d.question7}</p>
              <p>Question 8: {d.question8}</p>
              <p>Question 9: {d.question9}</p>
              <p>Grade G: {d.G}</p>
              <p>Grade A: {d.A}</p>
              <p>Grade B: {d.B}</p>
              <p>Grade C: {d.C}</p>
              <p>Grade D: {d.D}</p>
              <p>Grade F: {d.F}</p>
              <p>Grade *: {d["*"]}</p>
              <p>Pass Rate: {d.pass_rate}</p>
              <p>GPA: {d.GPA}</p>
              <p>GPA Median: {d.GPA_median}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
