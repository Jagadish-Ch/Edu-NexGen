import PublicViewHeader from "@/components/public-view/header";

const GuestLogin = () => {
  let config = ["Admin", "Instructor", "User"];
  return (
    <div className="flex flex-col min-h-screen">
      <PublicViewHeader guestAccountAccess={false} />
      {/* <div className="flex items-center justify-evenly min-h-[calc(100vh-3.5rem)] bg-background"> */}
      {/* <div className="flex justify-center flex-wrap min-h-[calc(100vh-3.5rem)] bg-green-700"> */}
      <div className="box bg-blues-700 min-h-[calc(100vh-3.5rem)] place-content-center ">
        <h2 className="text-3xl text-center bg-reds-800 font-extrabold">
          Guest - Login As
        </h2>
        <div className="wrapper h-[20rem] bg-greens-600 flex flex-wrap justify-center items-center">
          {config.map((eachBtnName, index) => (
            <div
              id={index}
              className="h-[12rem] w-[12rem] m-3 hover:cursor-pointer border-4 border-double rounded-lg text-2xl text-yellow-600 font-extrabold self-center place-content-center text-center bg-gradient-to-r from-zinc-600 to-zinc-800 hover:scale-105 delay-500"
            >
              {eachBtnName}
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default GuestLogin;
