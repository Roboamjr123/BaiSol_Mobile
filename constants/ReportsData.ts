const ReportsData = [
  {
    id: 9,
    taskName: "New Task 5",
    plannedStartDate: "2024-10-23T00:00:00Z",
    plannedEndDate: "2024-10-25T09:00:00Z",
    isEnable: false,
    isFinished: false,
    taskProgress: 0, // Adding taskProgress
    proofImage: null, // No image uploaded initially
    actualStart: "2024-10-23T00:00:00Z", // Actual start date can be assigned when the task starts
    estimationStart: "2024-10-23T00:00:00Z", // Planned start date
    isLate: false, // Initially, not late
    daysLate: 0, // Initially, no days late
  },
  {
    id: 8,
    taskName: "New Task 4",
    plannedStartDate: "2024-10-24T00:00:00Z",
    plannedEndDate: "2024-10-25T09:00:00Z",
    isEnable: true,
    isFinished: false,
    taskProgress: 0, // 30% progress
    proofImage: null,
    actualStart: "2024-10-24T00:00:00Z",
    estimationStart: "2024-10-24T00:00:00Z",
    isLate: false,
    daysLate: 0,
  },
  {
    id: 5,
    taskName: "New Task 1",
    plannedStartDate: "2024-10-25T00:00:00Z",
    plannedEndDate: "2024-10-30T09:00:00Z",
    isEnable: false,
    isFinished: false,
    taskProgress: 0,
    proofImage: null,
    actualStart: "2024-10-25T00:00:00Z",
    estimationStart: "2024-10-25T00:00:00Z",
    isLate: false,
    daysLate: 0,
  },
  {
    id: 10,
    taskName: "New Task 6",
    plannedStartDate: "2024-10-28T00:00:00Z",
    plannedEndDate: "2024-10-31T09:00:00Z",
    isEnable: false,
    isFinished: false,
    taskProgress: 0,
    proofImage: null,
    actualStart: "2024-10-28T00:00:00Z",
    estimationStart: "2024-10-28T00:00:00Z",
    isLate: false,
    daysLate: 0,
  },
];

export default ReportsData;