import { useSearchContext } from "../contexts/SearchContext"
import { useQuery } from "react-query";
import * as apiClient from "../api-client.js"
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard.jsx";

const Search = () => {
    const search = useSearchContext();
    const [page, setPage] = useState(1);

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
      };

    const { data: campsiteData } = useQuery(["searchCampsites", searchParams], () => {
        apiClient.searchCampsites(searchParams)
    });


    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter By</h3>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {campsiteData?.pagination.total} Campsites Found
                        {search.destination ? ` in ${search.destination}` : ""}
                    </span>
                    {/* Sort */}
                </div>
                {campsiteData?.data.map((campsite) => (
                    <SearchResultsCard campsite={campsite} />
                ))}
            </div>
        </div>
    );
}

export default Search