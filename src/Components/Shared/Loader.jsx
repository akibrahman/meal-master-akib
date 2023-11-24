import { ImSpinner9 } from "react-icons/im";

const Loader = () => {
  return (
    <div className="h-[60vh] w-full flex items-center justify-center">
      <ImSpinner9 className="animate-spin w-[150px] h-[150px] text-primary" />
    </div>
  );
};

export default Loader;
