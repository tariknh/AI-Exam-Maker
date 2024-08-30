import { InputFile } from "../components/DropzoneButton";

type Props = {};

const page = (props: Props) => {
  return (
    <main className=" grid place-content-center items-center h-screen">
      <InputFile />
    </main>
  );
};

export default page;
