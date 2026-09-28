export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-lg font-bold text-white">
        S
      </div>

      <div>
        <h2 className="text-lg font-bold">SIMPAH</h2>

        <p className="text-xs text-muted-foreground">
          Sistem Informasi Persampahan
        </p>
      </div>
    </div>
  );
}