import { Dna } from 'react-loader-spinner';
import { Wrapper } from './Loader.styled';

const Loader = () => {
  return (
      <Wrapper>
          <Dna
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
/>
    </Wrapper>
  )
}

export default Loader