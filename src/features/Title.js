const Title = ({ title }) => {
  return (
    <section className="w-full mt-20 mb-12 flex items-center justify-between">
      <div className="w-full ">
        <p className="text-headingColor text-2xl font-semibold relative before:absolute before:content before:-bottom-2 before:left-0 before:w-24 before:h-1 before:rounded-xs before:bg-gradient-to-tl from-orange-400 to-orange-600">
          {title}
        </p>
      </div>
    </section>
  );
};

export default Title;
