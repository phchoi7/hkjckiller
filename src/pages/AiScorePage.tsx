import { useEffect, useState } from "react";
import "./App.css";
import ButtonAppBar from "./ButtonAppBar";
import AiScoreCard from "./component/AiScoreCard";
import Ball from "./component/Ball";
import CollapsibleTable from "./component/CollapsibleTable";
import LiveScoreCard from "./component/LiveScoreCard";
import LoadingFunction from "./component/LoadingFunction";
import Loadingfunction from "./component/LoadingFunction";
import "./LiveScore.css";
/* This example requires Tailwind CSS v2.0+ */
import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
} from "@heroicons/react/outline";

const features = [
  {
    name: "Competitive exchange rates",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: GlobeAltIcon,
  },
  {
    name: "No hidden fees",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ScaleIcon,
  },
  {
    name: "Transfers are instant",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: LightningBoltIcon,
  },
  {
    name: "Mobile notifications",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: AnnotationIcon,
  },
];

function AiScorePage() {
  const [isLoading, setLoading] = useState(true);
  const [matchProvider, setMatchProvider] = useState<any>();

  const loadAllPage = async () => {
    const ProxyServer = "https://cors.bridged.cc/";

    const res = await fetch(
      `${ProxyServer}http://www.woxiangwan.com/zcj/jincai/getAllMatchList`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          origin: "*",
          "x-request-url": "txt-api.7m.com.cn",
          "x-cors-grida-api-key": "fec76fa0-7a9f-44e5-b4da-1ad50c338b43",
        },
      }
    );

    const json = await res.json();

    console.log(json);
    if (json && json.rows.length > 0) {
      setMatchProvider(json);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllPage();
    if (matchProvider && matchProvider) {
      console.log("loaded match", matchProvider);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingFunction />
      ) : (
        <>
          <div>{matchProvider.titleText}</div>
          <div>{matchProvider.titleRate}</div>
          <AiScoreCard data={matchProvider.rows} />
        </>
      )}
    </>
  );
}

export default AiScorePage;
