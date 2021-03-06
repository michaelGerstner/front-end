import Head from 'components/head';
import HeroBanner from 'components/HeroBanner/HeroBanner';
import Content from 'components/Content/Content';
import FeaturedJobsData from 'components/FeaturedJobItem/featuredJobs.json';
import FeaturedJobItem from 'components/FeaturedJobItem/FeaturedJobItem';
import ZipRecruiterJobs from 'components/ZipRecruiterJobs/ZipRecruiterJobs';

export default () => (
  <>
    <Head title="Jobs" />

    <HeroBanner title="Jobs" />

    <Content
      theme="gray"
      title="Featured"
      hasTitleUnderline
      columns={FeaturedJobsData.filter(job => job.status === 'active').map(job => (
        <FeaturedJobItem key={job.sourceUrl} {...job} />
      ))}
    />

    <Content
      theme="white"
      title="ZipRecruiter"
      hasTitleUnderline
      columns={[<ZipRecruiterJobs />]}
    />
  </>
);
