import Events from "./Events";
import "../../../css/home.css";
import PopularClothes from "./PopularClothes";
import NewClothes from "./NewClothes";
import Statistics from "./Statistics";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";



export default function HomePage() {
    return (
        <div className={"homepage"}>
            <Statistics />
            <PopularClothes />
            <NewClothes />
            <Advertisement />
            <ActiveUsers />
            <Events />
        </div>
    );
}