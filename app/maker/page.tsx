import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import { InputFile } from "../components/DropzoneButton";

type Props = {};
const math =
  "Bruk tan((\\theta)/2)-substitusjonen til å beregne det ubestemte integralet (I = int \frac{1}{sin \theta} d\theta).";

const math2 =
  "% \\f is defined as #1f(#2) using the macro\n" +
  "\\f\\relax{x} = \\int_{-\\infty}^\\infty\n" +
  "    \\f\\hat\\xi\\,e^{2 \\pi i \\xi x}\n" +
  "    \\,d\\xi";
const page = (props: Props) => {
  return (
    <main className=" grid place-content-center items-center">
      <InputFile />
      <InlineMath>{String.raw`${math}`}</InlineMath>
      {/* <InlineMath>{math}</InlineMath> */}
    </main>
  );
};

export default page;
