import CategoryComponent from "./CategoryComponent";
import { useEffect, useState } from "react";
import dummyPic from "../assets/pg1.jpg";
import { Link, useLocation } from "react-router-dom";

export default function DiscoverComponent(props) {
  Array.from(document.getElementsByClassName("navigation-list-item")).map((item) => { item.removeAttribute("style", "color:#f97316;") })

  document.getElementById("DiscoverNav").setAttribute("style", "color:#f97316;")

  const location = useLocation();
  const [filter, setFilter] = useState(
    location?.state?.selected >= 0 ? location.state.selected : -1
  );
  const [projects, setProjects] = useState([]);
  const changeFilter = (val) => {
    setFilter(val);
  };
  const getAllProjects = async () => {
    try {
      let res = await props.contract.getAllProjectsDetail().then((res) => {
        let tmp = [];
        for (const index in res) {
          let {
            amountRaised,
            cid,
            creatorName,
            fundingGoal,
            projectDescription,
            projectName,
            totalContributors,
            category,
          } = { ...res[index] };
          tmp.push({
            amountRaised,
            cid,
            creatorName,
            fundingGoal,
            projectDescription,
            projectName,
            totalContributors,
            index,
            category,
          });
        }
        return tmp;
      });

      if (filter !== -1) {
        let tmp = [];
        for (const index in res) {
          if (res[index].category === filter) {
            tmp.push(res[index]);
          }
        }
        res = tmp;
      }

      setProjects(res);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };
  const renderCards = () => {
    return projects.map((project, index) => {
      return (
        <Link to="/project" state={{ index: project.index }} key={index}>
          {/* <div className="projectCardWrapper">
            <div className="projectCard">
              <div
                className="cardImg rounded-2xl "
                style={{
                  backgroundImage: project.cid
                    ? `url(${"https://" + project.cid})`
                    : dummyPic,
                }}
              ></div>
              <div className="cardDetail">
                <div className="cardTitle text-3xl text-orange-500  font-bold">{project.projectName}</div>
                <div className="cardDesc text-2xl text-orange-400    font-medium">{project.projectDescription}</div>
                <div className="cardAuthor text-2xl  text-orange-400    font-medium">{project.creatorName}</div>
              </div>
            </div>
          </div> */}
          <div className="projectCardContainers m-10 cursor-pointer">
            <div className="w-full bg-black px-8 py-8 rounded-lg min-w-72 hover-bg-glow-custom-2">
              <div className="flex flex-col h-full justify-start items-center">
                <div className="flex mx-6 aspect-square w-2/3 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full m-5 mb-8"
                  style={{
                    backgroundImage: project.projectLink
                      ? `url(${"https://" + project.projectLink})`
                      : dummyPic,
                  }}
                >
                </div>
                <div className="w-full">
                  <h5 className="flex flex-col mt-1 text-left m-2 text-3xl text-white w-full"><span className="text-5xl text-orange-500"></span>{project.projectName}</h5>
                  <p className="text-md p-2 text-xl text-neutral-500">
                    {project.projectDescription}
                  </p>
                </div>
              </div>
            </div>
            {/* <div class="card ">
  <div class="card-front flex flex-col justify-start justify-evenly items-center">
  <div
                className="cardImg rounded-full"
                
              ></div>
    <p class="title"></p>
    {/* <p class="subtitle">Web Dev</p> 
  </div>
  <div class="card-back">
    <p></p>
  </div>
</div> */}
          </div>
        </Link>
      );
    });
  };

  useEffect(() => {
    getAllProjects();
  }, [filter]);


  return (

    <>

      {/* <div className="discoverHeading    text-2xl text-orange-500  font-bold   ">Discover</div> */}
      <div className="discoverContainer">
        {projects.length !== 0 ? (
          renderCards()
        ) : (
          <div className="noProjects">No projects found</div>
        )}
      </div>
    </>
  );
}
