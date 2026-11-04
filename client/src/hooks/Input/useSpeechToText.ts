import useSpeechToTextExternal from './useSpeechToTextExternal';
import useSpeechToTextBrowser from './useSpeechToTextBrowser';
import useGetAudioSettings from './useGetAudioSettings';

const useSpeechToText = (
<<<<<<< HEAD
  setText: (text: string) => void,
  onTranscriptionComplete: (text: string) => void,
): {
  isLoading?: boolean;
  isListening?: boolean;
  stopRecording: () => void | (() => Promise<void>);
  startRecording: () => void | (() => Promise<void>);
=======
  setText: (text: string, takeId?: number) => void,
  onTranscriptionComplete: (text: string, takeId?: number) => void,
  onTranscriptionSettled: (takeId?: number) => void,
  /** Host-owned Auto Send Text preference. */
  autoSendText: number,
): {
  isLoading?: boolean;
  isListening?: boolean;
  stopRecording: () => void | Promise<void>;
  startRecording: (takeId?: number) => void | Promise<void>;
  /** Ends capture without producing a transcript. */
  abortRecording: () => void;
>>>>>>> upstream/main
} => {
  const { speechToTextEndpoint } = useGetAudioSettings();
  const externalSpeechToText = speechToTextEndpoint === 'external';

  const {
    isListening: speechIsListeningBrowser,
    isLoading: speechIsLoadingBrowser,
    startRecording: startSpeechRecordingBrowser,
    stopRecording: stopSpeechRecordingBrowser,
<<<<<<< HEAD
  } = useSpeechToTextBrowser(setText, onTranscriptionComplete);
=======
    abortRecording: abortSpeechRecordingBrowser,
  } = useSpeechToTextBrowser(
    setText,
    onTranscriptionComplete,
    onTranscriptionSettled,
    autoSendText,
  );
>>>>>>> upstream/main

  const {
    isListening: speechIsListeningExternal,
    isLoading: speechIsLoadingExternal,
    externalStartRecording: startSpeechRecordingExternal,
    externalStopRecording: stopSpeechRecordingExternal,
<<<<<<< HEAD
  } = useSpeechToTextExternal(setText, onTranscriptionComplete);
=======
    externalAbortRecording: abortSpeechRecordingExternal,
  } = useSpeechToTextExternal(
    setText,
    onTranscriptionComplete,
    onTranscriptionSettled,
    autoSendText,
  );
>>>>>>> upstream/main

  const isListening = externalSpeechToText ? speechIsListeningExternal : speechIsListeningBrowser;
  const isLoading = externalSpeechToText ? speechIsLoadingExternal : speechIsLoadingBrowser;

  const startRecording = externalSpeechToText
    ? startSpeechRecordingExternal
    : startSpeechRecordingBrowser;
  const stopRecording = externalSpeechToText
    ? stopSpeechRecordingExternal
    : stopSpeechRecordingBrowser;

<<<<<<< HEAD
=======
  const abortRecording = externalSpeechToText
    ? abortSpeechRecordingExternal
    : abortSpeechRecordingBrowser;

>>>>>>> upstream/main
  return {
    isLoading,
    isListening,
    stopRecording,
    startRecording,
<<<<<<< HEAD
=======
    abortRecording,
>>>>>>> upstream/main
  };
};

export default useSpeechToText;
