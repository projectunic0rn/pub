import { ProfilingReport } from '@api/profiling-service';

export class MockProfilingService {
  public sendReport(report: ProfilingReport) {
    return report;
  }
}
