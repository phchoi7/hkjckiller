import { useEffect, useState } from "react";
import "./App.css";
import LiveScoreCard from "./component/LiveScoreCard";
import LoadingFunction from "./component/LoadingFunction";
import Loadingfunction from "./component/LoadingFunction";
import "./LiveScore.css";

function LiveScorePage() {
  const [isLoading, setLoading] = useState(true);
  const [matchProvider, setMatchProvider] = useState<any>();

  const loadAllPage = async () => {
    const ProxyServer = "https://cors.bridged.cc/";

    const res = await fetch(
      `${ProxyServer}https://txt-api.7m.com.cn/tips/recommend/recommendMatch?lan=1&stateneed=0&plat=4&v=1629302369081`,
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
    if (json && json.data.list !== undefined && json.data.list.length > 0) {
      setMatchProvider(json.data.list);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllPage();
    if (matchProvider && matchProvider) {
      console.log("load match", matchProvider);
    }
  }, [matchProvider]);

  return (
    <>
      {isLoading ? (
        <LoadingFunction />
      ) : (
        <>
          {matchProvider &&
            matchProvider?.map((data: any) => <LiveScoreCard data={data} />)}
        </>
      )}
    </>
  );
}

export default LiveScorePage;
