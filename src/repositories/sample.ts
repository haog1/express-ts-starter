const getSampleData = () => {
  return {
    message: 'This is sample data',
  }
}

const createSampleData = async (data: { request1: string; request2: string }) => {
  return await {
    data,
  }
}

export const SampleRepository = {
  getSampleData,
  createSampleData,
}
