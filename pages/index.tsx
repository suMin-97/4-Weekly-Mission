import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";
import { privateAxios } from "@/src/sharing/util";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    privateAxios.get("folders");
  });

  return (
    <>
      <Head>
        <title>Linkbrary</title>
      </Head>
      <main></main>
    </>
  );
}
