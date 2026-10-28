import { logger } from '@librechat/data-schemas';
import { OpenTelemetryTransportV3 } from '@opentelemetry/winston-transport';
<<<<<<< HEAD
import { attachLogsTransport, detachLogsTransport, getLogsTransport } from './logs';
import { getTelemetryConfig } from './config';

function countOtelTransports(): number {
  return logger.transports.filter((transport) => transport instanceof OpenTelemetryTransportV3)
    .length;
=======
import { attachLogsTransport, detachLogsTransport } from './logs';
import { getTelemetryConfig } from './config';

function getOtelTransports(): OpenTelemetryTransportV3[] {
  return logger.transports.filter(
    (transport): transport is OpenTelemetryTransportV3 =>
      transport instanceof OpenTelemetryTransportV3,
  );
}

function countOtelTransports(): number {
  return getOtelTransports().length;
>>>>>>> upstream/main
}

describe('logs transport lifecycle', () => {
  let emitWarningSpy: jest.SpyInstance;

  beforeEach(() => {
    emitWarningSpy = jest.spyOn(process, 'emitWarning').mockImplementation(() => true);
  });

  afterEach(() => {
    detachLogsTransport();
    emitWarningSpy.mockRestore();
  });

  it('adds one OpenTelemetry transport to the shared logger at the configured level', () => {
    const config = getTelemetryConfig({ OTEL_LOGS_ENABLED: 'true', OTEL_LOGS_LEVEL: 'warn' });

    attachLogsTransport(config);
    attachLogsTransport(config);

    expect(countOtelTransports()).toBe(1);
<<<<<<< HEAD
    expect(getLogsTransport()?.level).toBe('warn');
=======
    expect(getOtelTransports()[0]?.level).toBe('warn');
>>>>>>> upstream/main
    expect(emitWarningSpy).not.toHaveBeenCalled();
  });

  it('falls back to info and warns when OTEL_LOGS_LEVEL is unknown', () => {
    attachLogsTransport(getTelemetryConfig({ OTEL_LOGS_ENABLED: 'true', OTEL_LOGS_LEVEL: 'loud' }));

<<<<<<< HEAD
    expect(getLogsTransport()?.level).toBe('info');
=======
    expect(getOtelTransports()[0]?.level).toBe('info');
>>>>>>> upstream/main
    expect(emitWarningSpy).toHaveBeenCalledWith(
      expect.stringContaining('Ignoring unknown OTEL_LOGS_LEVEL "loud"; using "info"'),
      { code: 'LIBRECHAT_OTEL' },
    );
  });

  it('removes the transport from the shared logger on detach', () => {
    attachLogsTransport(getTelemetryConfig({ OTEL_LOGS_ENABLED: 'true' }));
<<<<<<< HEAD
    const transport = getLogsTransport();
=======
    const transport = getOtelTransports()[0];
>>>>>>> upstream/main

    detachLogsTransport();
    detachLogsTransport();

    expect(transport).toBeDefined();
<<<<<<< HEAD
    expect(getLogsTransport()).toBeUndefined();
=======
>>>>>>> upstream/main
    expect(countOtelTransports()).toBe(0);
    expect(logger.transports).not.toContain(transport);
  });
});
