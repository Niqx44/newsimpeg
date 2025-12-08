"use client";

import ModalBase from "./ModalBase";
import Accordion from "./Accordion";

export default function PersyaratanModal({ open, onClose, type }) {
  return (
    <ModalBase
      open={open}
      onClose={onClose}
      title={`Persyaratan ${type}`}
    >
      {/* === KGB === */}
      {type === "KGB" && (
        <ol className="list-decimal pl-5 space-y-1 text-sm">
          <li>Surat pengantar dari atasan langsung KGB</li>
          <li>Rekap absensi 1 tahun terakhir</li>
          <li>Fotocopy SK pangkat terakhir</li>
          <li>Fotocopy KGB tahun terakhir</li>
        </ol>
      )}

      {/* === PENSIUN === */}
      {type === "Pensiun" && (
        <ol className="list-decimal pl-5 space-y-1 text-sm">
          <li>Surat usul pimpinan unit kerja (PDF)</li>
          <li>Pasfoto berwarna 3×4 terbaru</li>
          <li>SK/PPKP 1 tahun terakhir</li>
          <li>Kartu Keluarga</li>
          <li>Akta nikah / cerai / kematian (jika ada)</li>
        </ol>
      )}

      {/* === KENAIKAN PANGKAT (DROPDOWN) === */}
      {type === "Pangkat" && (
        <>
          <p className="text-sm mb-4 text-gray-600">
            Silakan pilih jenis kenaikan pangkat untuk melihat persyaratan.
          </p>

          <Accordion title="Kenaikan Pangkat Reguler / KPO">
            <ol className="list-decimal pl-5 space-y-1">
              <li>Masa kerja 4 tahun</li>
              <li>PPKP bernilai baik 2 tahun terakhir</li>
              <li>Tidak melampaui pangkat atasan langsung</li>
              <li>Lulus ujian dinas (jika lintas golongan)</li>
            </ol>
          </Accordion>

          <Accordion title="Kenaikan Pangkat Pilihan Jabatan Fungsional">
            <ol className="list-decimal pl-5 space-y-1">
              <li>SK jabatan fungsional</li>
              <li>Angka kredit memenuhi</li>
              <li>Penilaian kinerja baik</li>
            </ol>
          </Accordion>

          <Accordion title="Kenaikan Pangkat Pilihan Prestasi Kerja">
            <ol className="list-decimal pl-5 space-y-1">
              <li>SK prestasi luar biasa</li>
              <li>Rekomendasi pimpinan</li>
            </ol>
          </Accordion>

          <Accordion title="Kenaikan Pangkat Penyesuaian Ijazah">
            <ol className="list-decimal pl-5 space-y-1">
              <li>Ijazah yang relevan</li>
              <li>SK penyesuaian ijazah</li>
            </ol>
          </Accordion>
        </>
      )}
    </ModalBase>
  );
}
