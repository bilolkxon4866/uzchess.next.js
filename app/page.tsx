import HeaderItem from "@/app/command/Header/Header";
import Footer from "@/app/command/Footer/Footer";
import Anons from "@/app/command/Anons";
import GameOfTheDay from "@/app/command/Main/GameOfTheDay";
import Ranking from "@/app/command/Main/Ranking";
import QuickLinks from "@/app/command/Main/QuickLinks";
import CompletedGames from "@/app/command/Main/CompletedGames";
import ChampionshipBanner from "@/app/command/Main/ChampionshipBanner";
import NewsList from "@/app/command/Main/NewsList";
import DonationCard from "@/app/command/Main/DonationCard";
import TopCourses from "@/app/command/Main/TopCourses";
import TopBooks from "@/app/command/Main/TopBooks";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 bg-[#111315]">
            <HeaderItem/>

            <div className="flex gap-6 mt-6 ml-[34px] items-start">
                <div className="flex flex-col gap-6 w-[326px] shrink-0">
                    <GameOfTheDay/>
                    <Ranking/>
                </div>

                <div className="flex flex-col gap-6 w-[676px] shrink-0">
                    <QuickLinks/>
                    <CompletedGames/>
                    <ChampionshipBanner/>
                    <NewsList/>
                </div>

                <div className="flex flex-col gap-6 w-[326px] shrink-0">
                    <DonationCard/>
                    <div className="-ml-5">
                        <Anons/>
                    </div>
                    <TopCourses/>
                    <TopBooks/>
                </div>
            </div>

            <Footer/>
        </div>
    );
}