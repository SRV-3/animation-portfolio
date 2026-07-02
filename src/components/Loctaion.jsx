import TextReveal from "@/components/TextReveal";

const Loctaion = () => {
  return (
    <div>
      <div className="w-[22rem] h-[14.5rem] absolute left-[60%] bottom-0 flex flex-col pb-12 justify-end">
        <TextReveal splitBy="chars" duration=".8">
          <h3 className="text-2xl font-bold">Shimla</h3>
        </TextReveal>
        <TextReveal splitBy="words" duration="1.2">
          <h3 className="text-2xl font-bold">Himachal Pradesh</h3>
        </TextReveal>
        <TextReveal splitBy="words" duration=".8">
          <p className=" text-[1.2rem] ">
            “Not all those who wander are lost.”
          </p>
        </TextReveal>
      </div>
    </div>
  );
};

export default Loctaion;
