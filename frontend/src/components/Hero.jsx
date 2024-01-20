import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="hero">
      <div className="bg-green-800 pb-16">
        <div className="container mx-auto flex flex-col gap-2">
          <h1 className="text-5xl text-white font-bold">
            Find your next campsite
          </h1>
          <p className="text-2xl text-white">Explore the great outdoors!</p>
        </div>
      </div>
          <SearchBar />
    </div>
  );
};

export default Hero;
