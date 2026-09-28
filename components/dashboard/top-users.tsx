interface Props {
  users: {
    id: string;
    name: string;
    totalPoint: number;
  }[];
}

export default function TopUsers({
  users,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-5 text-xl font-bold">
        Top 5 Warga
      </h2>

      <div className="space-y-4">
        {users.map((user, index) => (
          <div
            key={user.id}
            className="flex justify-between"
          >
            <div>
              <p className="font-semibold">
                #{index + 1} {user.name}
              </p>
            </div>

            <span className="font-bold text-teal-600">
              {user.totalPoint}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}