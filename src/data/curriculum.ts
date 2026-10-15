/**
 * SAMPLE Computer Science curriculum, 8 semesters, 133 credits.
 * NOT UFE's official plan: course list, credits and prerequisites are
 * illustrative, except the six codes/titles from the production page and the
 * APL121 → DBM121 → ISA331 / ISA332 chain from the brief. Titles for invented
 * courses are drafts that the Registry must confirm. Dependency-free so
 * `node src/data/curriculum.ts` can check the total.
 */
export interface PlanCourse {
  code: string;
  titleMn: string;
  titleEn: string;
  credits: number;
  semester: number; // 1..8
  prereqs: string[];
}

/** Semester 5 (Autumn 2026-2027) is the current term. */
export const CURRENT_SEMESTER = 5;
export const REQUIRED_CREDITS = 133;

const c = (semester: number, code: string, titleMn: string, titleEn: string, credits: number, prereqs: string[] = []): PlanCourse => ({
  code, titleMn: titleMn.toLocaleUpperCase("mn"), titleEn, credits, semester, prereqs,
});

export const plan: PlanCourse[] = [
  // Year 1, Autumn
  c(1, "MAT101", "Математик анализ I", "Calculus I", 4),
  c(1, "CSC101", "Компьютерын шинжлэх ухааны оршил", "Introduction to Computer Science", 3),
  c(1, "ENG101", "Академик англи хэл I", "Academic English I", 3),
  c(1, "PHY101", "Тооцоолол техникийн физик", "Physics for Computing", 3),
  c(1, "GED101", "Монгол Улсын түүх, хууль эрх зүйн үндэс", "Mongolian Studies and Law", 2),
  c(1, "PED101", "Биеийн тамир", "Physical Education", 1),
  // Year 1, Spring
  c(2, "MAT102", "Математик анализ II", "Calculus II", 4, ["MAT101"]),
  c(2, "CSC102", "Програмчлалын үндэс", "Programming Fundamentals", 4, ["CSC101"]),
  c(2, "ENG102", "Академик англи хэл II", "Academic English II", 3, ["ENG101"]),
  c(2, "MAT103", "Дискрет математик", "Discrete Mathematics", 3),
  c(2, "ECN101", "Эдийн засгийн үндэс", "Principles of Economics", 3),
  // Year 2, Autumn
  c(3, "MAT201", "Шугаман алгебр", "Linear Algebra", 3, ["MAT102"]),
  c(3, "CSC201", "Өгөгдлийн бүтэц", "Data Structures", 4, ["CSC102"]),
  c(3, "CSC202", "Компьютерын архитектур", "Computer Organization", 3, ["CSC101"]),
  c(3, "ENG201", "Мэргэжлийн англи хэл", "Technical English", 2, ["ENG102"]),
  c(3, "BUS201", "Менежментийн үндэс", "Principles of Management", 3),
  c(3, "MAT111", "Хэрэглээний математик I", "Applied Mathematics I", 3, ["MAT102"]),
  // Year 2, Spring
  c(4, "MAT112", "Хэрэглээний математик II", "Applied Mathematics II", 3, ["MAT111"]),
  c(4, "CSC203", "Алгоритмын шинжилгээ", "Algorithm Analysis", 4, ["CSC201", "MAT103"]),
  c(4, "CSC204", "Үйлдлийн систем", "Operating Systems", 3, ["CSC202"]),
  c(4, "CSC205", "Объект хандлагат програмчлал", "Object-Oriented Programming", 3, ["CSC102"]),
  c(4, "CSC206", "Компьютерын сүлжээ", "Computer Networks", 3, ["CSC202"]),
  // Year 3, Autumn (current term)
  c(5, "ECN221", "Бизнесийн статистик", "Business Statistics", 3, ["MAT112"]),
  c(5, "APL121", "Алгоритм, програмчлалын хэл", "Algorithms and Programming Languages", 3, ["CSC102"]),
  c(5, "DBM121", "Өгөгдлийн сангийн үндэс", "Database Fundamentals", 3, ["APL121"]),
  c(5, "ISA331", "Системийн шинжилгээ ба зохиомж", "Systems Analysis and Design", 3, ["DBM121"]),
  c(5, "ISA332", "Бизнесийн шинжилгээ", "Business Analysis", 3, ["DBM121"]),
  c(5, "CSC301", "Программ хангамжийн инженерчлэл", "Software Engineering", 3, ["CSC205"]),
  // Year 3, Spring
  c(6, "CSC302", "Вэб хөгжүүлэлт", "Web Development", 3, ["DBM121"]),
  c(6, "CSC303", "Хиймэл оюун", "Artificial Intelligence", 3, ["CSC203", "MAT201"]),
  c(6, "CSC304", "Мэдээллийн аюулгүй байдал", "Information Security", 3, ["CSC206"]),
  c(6, "CSC305", "Гар утасны аппликейшн хөгжүүлэлт", "Mobile App Development", 3, ["CSC205"]),
  c(6, "ISA333", "Мэдээллийн технологийн төслийн менежмент", "IT Project Management", 2, ["ISA331"]),
  c(6, "ELE301", "Сонгон хичээл I", "Elective I", 2),
  // Year 4, Autumn
  c(7, "CSC401", "Машин сургалт", "Machine Learning", 3, ["CSC303", "ECN221"]),
  c(7, "CSC402", "Үүлэн тооцоолол", "Cloud Computing", 3, ["CSC204"]),
  c(7, "CSC403", "Тархсан систем", "Distributed Systems", 3, ["CSC204", "CSC206"]),
  c(7, "CSC404", "Хүн-компьютерын харилцан үйлдэл", "Human-Computer Interaction", 3, ["CSC301"]),
  c(7, "GED401", "Бизнес эрхлэлт", "Entrepreneurship", 2),
  c(7, "ELE401", "Сонгон хичээл II", "Elective II", 2),
  // Year 4, Spring
  c(8, "CSC490", "Үйлдвэрлэлийн дадлага", "Industrial Internship", 4, ["CSC301"]),
  c(8, "CSC499", "Төгсөлтийн ажил", "Graduation Thesis", 10, ["CSC301", "ISA332"]),
  c(8, "GED402", "Мэргэжлийн ёс зүй", "Professional Ethics", 2),
];

export const semesterLabel = (n: number) => {
  const year = 2023 + Math.floor((n - 1) / 2);
  return `Year ${Math.ceil(n / 2)} · ${n % 2 ? "Autumn" : "Spring"} (${year}-${year + 1})`;
};

export const totalCredits = plan.reduce((a, p) => a + p.credits, 0);

if (typeof process !== "undefined" && process.argv[1]?.endsWith("curriculum.ts")) {
  const per = Array.from({ length: 8 }, (_, i) => plan.filter((p) => p.semester === i + 1).reduce((a, p) => a + p.credits, 0));
  console.log("credits per semester", per, "total", totalCredits);
  const codes = new Set(plan.map((p) => p.code));
  console.log("dup codes:", plan.length - codes.size, "bad prereqs:", plan.flatMap((p) => p.prereqs.filter((q) => !codes.has(q) || plan.find((x) => x.code === q)!.semester >= p.semester && !(p.semester === 5))).join(",") || "none");
}
