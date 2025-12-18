"use client";

import { useEffect, useState } from "react";
import PeraturanTable from "@/components/shared/peraturan/PeraturanTable";

export default function UserPeraturanPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data/peraturan.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-3">
      <h2 className="text-xl font-semibold text-black mb-4">
        Peraturan
      </h2>

      <div className="bg-[#2b2b2b] p-6 rounded-xl">
        <PeraturanTable
          data={data}
          onDownload={(row) =>
            console.log("Download:", row.file)
          }
        />
      </div>
    </main>
  );
}
