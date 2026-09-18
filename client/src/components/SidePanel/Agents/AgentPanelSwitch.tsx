import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AgentPanelProvider, useAgentPanelContext } from '~/Providers/AgentPanelContext';
import AgentPanelSplash from '~/nj/components/Agents/AgentPanelSplash';
import { atomWithLocalStorage } from '~/store/utils';
import { Panel, isEphemeralAgent } from '~/common';
import VersionPanel from './Version/VersionPanel';
import AgentPanel from './AgentPanel';
import store from '~/store';

const showSplashPageState = atomWithLocalStorage('agentPanelSplashPage', true);

export default function AgentPanelSwitch() {
  const conversation = useRecoilValue(store.conversationByIndex(0));
  const agentId = conversation?.agent_id ?? null;
  return (
    <AgentPanelProvider
      observeToolAuthorization={conversation != null && !isEphemeralAgent(agentId)}
    >
      <AgentPanelSwitchWithContext agentId={agentId} />
    </AgentPanelProvider>
  );
}

function AgentPanelSwitchWithContext({ agentId }: { agentId?: string | null }) {
  const { activePanel, setCurrentAgentId } = useAgentPanelContext();
  const [showSplashPage, setShowSplashPage] = useRecoilState(showSplashPageState);

  useEffect(() => {
    const agent_id = agentId ?? '';
    if (!isEphemeralAgent(agent_id)) {
      setCurrentAgentId(agent_id);
    }
  }, [setCurrentAgentId, agentId]);

  // NJ: Show our agent builder splash page until dismissed
  if (showSplashPage) {
    return <AgentPanelSplash setShowSplashPage={setShowSplashPage} />;
  }

  if (activePanel === Panel.version) {
    return <VersionPanel />;
  }
  return <AgentPanel />;
}
