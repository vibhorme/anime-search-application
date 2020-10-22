import React from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Flex from '../components/Flex';
import Input from '../components/InputComponent';
import Spinner from '../components/Spinner';
import Styled from 'styled-components';
import Text from '../components/Typography';

const InputStyled = Styled.div`
display: flex;
> input, > textarea {
  font-size: 16px;
  font-weight: 500;
  padding: 12px 14px;
  border: 1px solid #ffffff;
  border-right-width: 0px;
  border-radius: 6px 0px 0px 6px;
  width: 100%;
  color: #ffffff;
  outline: none;
  background: none;
}
>input::placeholder, >textarea::placeholder{
    color: rgba(18, 18, 29, 0.3);
  }

}`;

const Button = Styled.button`
background: none;
color: #ffffff;
border: 1px solid #ffffff;
padding: 8px 12px;
border-radius: 0px 6px 6px 0px;
outline: none;
cursor: pointer;
`;

const AppStyled = Styled.div`
width: 100vw;
height: 100vh;
`;

const App: React.FC = () => {
  const [input, setInput] = React.useState('');
  const [detail, setDetail] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleOnSearch = async (input: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios({
        url: `https://api.jikan.moe/v3/search/anime?q=${input}&limit=16`,
        method: 'get',
      });
      setIsLoading(false);
      setDetail(data.results);
    } catch (error) {}
  };
  return (
    <AppStyled>
      <Card background="#1E78BF" width="100%">
        <InputStyled>
          <Input
            fontSize="h4"
            fontWeight="semiBold"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                handleOnSearch(input);
              }
            }}
            placeholder="Search here..."
            value={input}
          />
          <Button onClick={() => handleOnSearch(input)}> Go</Button>
        </InputStyled>
        <Flex margin="12px 0px">
          <Text fontSize="h5" fontWeight="regular" stringColor="#c6c6c6">
            Requesting:&nbsp;
            <span style={{ color: '#ffffff' }}>
              {' '}
              https://api.jikan.moe/v3/search/anime?q=&limit=16&page=
            </span>
          </Text>
        </Flex>
        {!isLoading ? (
          <>
            {detail.length ? (
              <Flex
                justifyContent="space-evenly"
                flexWrap="wrap"
                margin="22px 0px"
              >
                {detail.map((el: any, index) => {
                  return (
                    <Card
                      padding="0px"
                      margin="0px 22px 22px 0px"
                      width="225px"
                      borderRadius="6px"
                      cursor="pointer"
                      onClick={() => (window.location.href = el.url)}
                      key={index}
                    >
                      <img
                        src={el.image_url}
                        style={{ borderRadius: '6px 6px 0px 0px' }}
                        alt="titleImage"
                      />
                      <Flex justifyContent="center" padding="12px 0px">
                        <Text
                          fontSize="h6"
                          fontWeight="semiBold"
                          stringColor="#000"
                          lineClamp={1}
                          padding="0px 12px"
                        >
                          {el.title}
                        </Text>
                      </Flex>
                    </Card>
                  );
                })}
              </Flex>
            ) : (
              <Flex
                flexDirection="column"
                margin="22px 0px"
                justifyContent="center"
              >
                <img
                  src="/image.jpg"
                  style={{ margin: '0px 0px 12px 0px' }}
                  alt="baseImage"
                />
                <Text fontSize="h6" fontWeight="bold" stringColor="#ffffff">
                  Welcome to the Anime Land
                </Text>
              </Flex>
            )}
          </>
        ) : (
          <Flex justifyContent="center" padding="42px 0px 0px 0px" width="100%">
            <Spinner type="primary" />
          </Flex>
        )}
      </Card>
    </AppStyled>
  );
};

export default App;
