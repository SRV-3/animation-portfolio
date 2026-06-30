import TextReveal from "./TextReveal";

const Navbar = () => {
  return (
    <div className="h-12 w-full flex justify-between items-center px-12 py-10 fixed">
      <div className="left">
        <TextReveal splitBy="words" duration=".8">
          <h3 className="font-extrabold text-[1.35rem] text-[#010101]">
            Sourav Singh
          </h3>
        </TextReveal>
      </div>
      <div className="right flex gap-4">
        <TextReveal duration=".8">
          <h3 className="text-[1.25rem]">HOME</h3>
        </TextReveal>
        <TextReveal duration=".8">
          <h3 className="text-[1.25rem]">ABOUT</h3>
        </TextReveal>
        <TextReveal duration=".8">
          <h3 className="text-[1.25rem]">CONTACT</h3>
        </TextReveal>
      </div>
    </div>
  );
};

export default Navbar;
