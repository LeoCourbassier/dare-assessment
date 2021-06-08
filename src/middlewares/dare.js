import Dare from '../controllers/dare';

const dareMiddleware = async (_request, _response, done) => {
  await Dare.getInstance().refresh();

  done();
};

export default dareMiddleware;
