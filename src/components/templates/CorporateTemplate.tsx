export default function CorporateTemplate({
  data,
}: {
  data: any;
}) {
  return (
    <div>
      <h1>Corporate Template</h1>
      <h2>{data.personalInfo?.fullName}</h2>
    </div>
  );
}