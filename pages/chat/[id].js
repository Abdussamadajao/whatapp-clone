import styled from 'styled-components';
import Head from 'next/head';
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';
import { db, auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '../../utils/getRecipientEmail';
import { async } from '@firebase/util'
import { collection, doc, getDoc, getDocs, orderBy } from 'firebase/firestore'
const Chat = ({ chat, messages }) => {
  const [user] = useAuthState(auth)
  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages}/>
      </ChatContainer>
    </Container>
  );
};

export default Chat;

export async function getServerSideProps(context) {
    const ref = doc(db, "chats",context.query.id,);
    const messageRef = collection(ref, "messages")

  // PREP the message on the server
    const docSnap = await getDocs(messageRef, orderBy("timestamp", 'asc'));
    const messages = docSnap.docs.map((doc) => ({
        id:doc.id,
        ...doc.data(),
    })).map(messages => ({
        ...messages,
        timestamp:messages.timestamp.toDate().getTime()
    }));


  const chatRes = await getDoc(ref);
  
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };
  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
