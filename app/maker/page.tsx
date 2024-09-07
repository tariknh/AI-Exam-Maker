import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import { InputFile } from "../components/DropzoneButton";

type Props = {};
const math =
  "Bruk tan((\\theta)/2)-substitusjonen til å beregne det ubestemte integralet (I = int \frac{1}{sin \theta} d\theta).";

const math2 =
  "Finn (b) slik at: (lim_{x \to 0} \frac{x sin(bx)}{x + 1 - e^x} = 2024).";
const page = (props: Props) => {
  return (
    <main className=" grid place-content-center items-center">
      <InputFile />
      <InlineMath>{math2}</InlineMath>
      <InlineMath>{math}</InlineMath>
    </main>
  );
};

export default page;
