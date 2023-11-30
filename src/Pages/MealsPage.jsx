// import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Select from "react-select";
import Container from "../Components/Shared/Container";
import Loader from "../Components/Shared/Loader";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const MealsPage = () => {
  const axiosInstance = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sbp, setSbp] = useState("l2h");
  const [text, setText] = useState("Yay! You have seen it all");

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["All-Meals", search, category, sbp],
    queryFn: async ({ queryKey, pageParam = 0 }) => {
      const data = await axiosInstance.get(
        `/all-meals?search=${queryKey[1]}&category=${queryKey[2]}&sbp=${queryKey[3]}&page=${pageParam}&limit=4`
      );
      return { ...data.data, prevOffset: parseInt(pageParam) };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.prevOffset + 4 > lastPage.count) {
        return undefined;
      }
      return lastPage.prevOffset + 4;
    },
  });
  console.log(data);

  const meals = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.meals];
  }, []);
  useEffect(() => {
    if (meals?.length == 0) {
      setText("No Found match");
    } else {
      setText("Yay! You have seen it all");
    }
  }, [meals?.length]);

  const options = [
    { value: "all", label: "All" },
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
  ];
  const options2 = [
    { value: "l2h", label: "Low to High" },
    { value: "h2l", label: "High to Low" },
  ];

  return (
    <div className="bg[url('/meals.jpg')] bg-fixed bg-cover bg-center">
      <div className="bg[rgba(0,0,0,0.7)]">
        <div className="flex items-center justify-center gap-10 py-4 bg-gradient-to-r from-primary to-secondary">
          <p className="text-center text-xl py-2 font-semibold text-white">
            Total Meals - {data?.pages[0].total}
          </p>
          <p className="text-center text-xl py-2 font-semibold text-white">
            Displayed Meals - {meals?.length}
          </p>
        </div>
        <div className="bg-gradient-to-r from-primary to-secondary py-2 flex items-center justify-center flex-col md:flex-row gap-6">
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="px-4 py-2 rounded-md w-[300px] focus:outline-none"
            type="text"
            name=""
            placeholder="Search by Name"
          />
          <div className="flex justify-between gap-4 items-center">
            <Select
              className="min-w-[150px]"
              onChange={(e) => setCategory(e.value)}
              defaultValue={options[0]}
              options={options}
            />
            <Select
              className="min-w-[150px]"
              onChange={(e) => setSbp(e.value)}
              defaultValue={options2[0]}
              options={options2}
            />
          </div>
        </div>
        {!meals ? (
          <Loader color={"white"} />
        ) : (
          <Container>
            <InfiniteScroll
              dataLength={meals ? meals.length : 0}
              next={() => fetchNextPage()}
              hasMore={hasNextPage}
              loader={
                <p className="flex items-center justify-center gap-2 font-semibold text-white py-5">
                  <ImSpinner9 className="text-3xl animate-spin" />
                  Loading...
                </p>
              }
              endMessage={
                <p className="font-semibold py-10 text-center text-white">
                  {text}
                </p>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5 mt-10">
                {meals && !data?.pages[0].count == 0 ? (
                  meals.map((meal, i) => (
                    <Link
                      to={`/meal/${meal._id}`}
                      className="w-[90%] mx-auto md:w-full"
                      key={i}
                    >
                      <div className="bg-primary rounded-t-md">
                        <img
                          src={meal.mealImage}
                          className="h-[200px] w-full rounded-t-md"
                          alt=""
                        />
                        <p className="text-center text-white py-2 font-semibold flex items-center justify-center gap-2">
                          {meal.mealTitle} -
                          <span className="flex items-center gap-1">
                            <FaBangladeshiTakaSign />
                            {meal.price}
                          </span>
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </InfiniteScroll>
          </Container>
        )}
      </div>
    </div>
  );
};

export default MealsPage;
