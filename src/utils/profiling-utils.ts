/**
 * general profiling utility class to
 * measure and report application performance
 * based on report identifier - 'reportName'
 */
import { ProfilingReport, ProfilingService } from '@api/profiling-service';
import { ServiceResolver } from '@api';
import { MockProfilingService } from '@mocks';

export class ProfilingUtils {
  private startTime: number;
  private endTime: number;
  private reportName: string;
  private additionalReportInfo: string;
  private profilingService: MockProfilingService | ProfilingService;

  constructor() {
    this.startTime = 0;
    this.endTime = 0;
    this.reportName = '';
    this.additionalReportInfo = '';
    this.profilingService = ServiceResolver.profilingResolver();
  }

  public setReportInfo(name: string, additionalInfo: string): void {
    this.reportName = name;
    this.additionalReportInfo = additionalInfo;
  }

  public startTimeRecord(): void {
    this.startTime = Date.now();
  }

  public endTimeRecord(): void {
    this.endTime = Date.now();
    const elapsedTime = this.endTime - this.startTime;
    const report: ProfilingReport = {
      name: this.reportName,
      value: elapsedTime,
      additionalInfo: this.additionalReportInfo,
    };

    this.sendReport(report);
  }

  private sendReport(report: ProfilingReport) {
    this.profilingService.sendReport(report);
  }
}
