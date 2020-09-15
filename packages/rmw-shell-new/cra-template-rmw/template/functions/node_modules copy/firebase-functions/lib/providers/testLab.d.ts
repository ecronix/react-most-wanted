import { CloudFunction, EventContext } from '../cloud-functions';
/** Handle events related to Test Lab test matrices. */
export declare function testMatrix(): TestMatrixBuilder;
/** Builder used to create Cloud Functions for Test Lab test matrices events. */
export declare class TestMatrixBuilder {
    private triggerResource;
    private options;
    /** Handle a TestMatrix that reached a final test state. */
    onComplete(handler: (testMatrix: TestMatrix, context: EventContext) => PromiseLike<any> | any): CloudFunction<TestMatrix>;
}
/** TestMatrix captures details about a test run. */
export declare class TestMatrix {
    /** Unique id set by the service. */
    testMatrixId: string;
    /** When this test matrix was initially created (ISO8601 timestamp). */
    createTime: string;
    /** Indicates the current progress of the test matrix */
    state: TestState;
    /**
     * The overall outcome of the test matrix run. Only set when the test matrix
     * state is FINISHED.
     */
    outcomeSummary?: OutcomeSummary;
    /** For 'INVALID' matrices only, describes why the matrix is invalid. */
    invalidMatrixDetails?: InvalidMatrixDetails;
    /** Where the results for the matrix are located. */
    resultStorage: ResultStorage;
    /** Information about the client which invoked the test. */
    clientInfo: ClientInfo;
}
/** Information about the client which invoked the test. */
export declare class ClientInfo {
    /** Client name, e.g. 'gcloud'. */
    name: string;
    /** Map of detailed information about the client which invoked the test. */
    details: {
        [key: string]: string;
    };
}
/** Locations where the test results are stored. */
export declare class ResultStorage {
    /** A storage location within Google Cloud Storage (GCS) for the test artifacts. */
    gcsPath?: string;
    /** Id of the ToolResults History containing these results. */
    toolResultsHistoryId?: string;
    /**
     * Id of the ToolResults execution that the detailed TestMatrix results are
     * written to.
     */
    toolResultsExecutionId?: string;
    /** URL to test results in Firebase Console. */
    resultsUrl?: string;
}
/**
 * The detailed reason that a Matrix was deemed INVALID.
 *
 * Possible values:
 * - 'DETAILS_UNAVAILABLE': The matrix is INVALID, but there are no further
 *   details available.
 * - 'MALFORMED_APK': The input app APK could not be parsed.
 * - 'MALFORMED_TEST_APK': The input test APK could not be parsed.
 * - 'NO_MANIFEST': The AndroidManifest.xml could not be found.
 * - 'NO_PACKAGE_NAME': The APK manifest does not declare a package name.
 * - 'INVALID_PACKAGE_NAME': The APK application ID is invalid.
 * - 'TEST_SAME_AS_APP': The test package and app package are the same.
 * - 'NO_INSTRUMENTATION': The test apk does not declare an instrumentation.
 * - 'NO_SIGNATURE': The input app apk does not have a signature.
 * - 'INSTRUMENTATION_ORCHESTRATOR_INCOMPATIBLE': The test runner class
 *   specified by user or in the test APK's manifest file is not compatible with
 *   Android Test Orchestrator.
 * - 'NO_TEST_RUNNER_CLASS': The test APK does not contain the test runner class
 *   specified by user or in the manifest file.
 * - 'NO_LAUNCHER_ACTIVITY': A main launcher activity could not be found.
 * - 'FORBIDDEN_PERMISSIONS': The app declares one or more permissions that are
 *   not allowed.
 * - 'INVALID_ROBO_DIRECTIVES': There is a conflict in the provided
 *   robo_directives.
 * - 'INVALID_RESOURCE_NAME': There is at least one invalid resource name in the
 *   provided robo directives.
 * - 'INVALID_DIRECTIVE_ACTION': Invalid definition of action in the robo
 *   directives, e.g. a click or ignore action includes an input text field.
 * - 'TEST_LOOP_INTENT_FILTER_NOT_FOUND': There is no test loop intent filter,
 *   or the one that is given is not formatted correctly.
 * - 'SCENARIO_LABEL_NOT_DECLARED': The request contains a scenario label that
 *   was not declared in the manifest.
 * - 'SCENARIO_LABEL_MALFORMED': There was an error when parsing a label value.
 * - 'SCENARIO_NOT_DECLARED': The request contains a scenario number that was
 *   not declared in the manifest.
 * - 'DEVICE_ADMIN_RECEIVER': Device administrator applications are not allowed.
 * - 'MALFORMED_XC_TEST_ZIP': The zipped XCTest was malformed. The zip did not ]
 *   contain a single .xctestrun file and the contents of the
 *   DerivedData/Build/Products directory.
 * - 'BUILT_FOR_IOS_SIMULATOR': The zipped XCTest was built for the iOS
 *   simulator rather than for a physical device.
 * - 'NO_TESTS_IN_XC_TEST_ZIP': The .xctestrun file did not specify any test
 *   targets.
 * - 'USE_DESTINATION_ARTIFACTS': One or more of the test targets defined in the
 *   .xctestrun file specifies "UseDestinationArtifacts", which is disallowed.
 * - 'TEST_NON_APP_HOSTED': XC tests which run on physical devices must have
 *   "IsAppHostedTestBundle" == "true" in the xctestrun file.
 * - 'PLIST_CANNOT_BE_PARSED': An Info.plist file in the XCTest zip could not be
 *   parsed.
 * - 'NO_CODE_APK': APK contains no code.
 * - 'INVALID_INPUT_APK': Either the provided input APK path was malformed, the
 *   APK file does not exist, or the user does not have permission to access the
 *   APK file.
 * - 'INVALID_APK_PREVIEW_SDK': APK is built for a preview SDK which is
 *   unsupported.
 */
export declare type InvalidMatrixDetails = 'DETAILS_UNAVAILABLE' | 'MALFORMED_APK' | 'MALFORMED_TEST_APK' | 'NO_MANIFEST' | 'NO_PACKAGE_NAME' | 'INVALID_PACKAGE_NAME' | 'TEST_SAME_AS_APP' | 'NO_INSTRUMENTATION' | 'NO_SIGNATURE' | 'INSTRUMENTATION_ORCHESTRATOR_INCOMPATIBLE' | 'NO_TEST_RUNNER_CLASS' | 'NO_LAUNCHER_ACTIVITY' | 'FORBIDDEN_PERMISSIONS' | 'INVALID_ROBO_DIRECTIVES' | 'INVALID_RESOURCE_NAME' | 'INVALID_DIRECTIVE_ACTION' | 'TEST_LOOP_INTENT_FILTER_NOT_FOUND' | 'SCENARIO_LABEL_NOT_DECLARED' | 'SCENARIO_LABEL_MALFORMED' | 'SCENARIO_NOT_DECLARED' | 'DEVICE_ADMIN_RECEIVER' | 'MALFORMED_XC_TEST_ZIP' | 'BUILT_FOR_IOS_SIMULATOR' | 'NO_TESTS_IN_XC_TEST_ZIP' | 'USE_DESTINATION_ARTIFACTS' | 'TEST_NOT_APP_HOSTED' | 'PLIST_CANNOT_BE_PARSED' | 'NO_CODE_APK' | 'INVALID_INPUT_APK' | 'INVALID_APK_PREVIEW_SDK';
/**
 * The state (i.e. progress) of a TestMatrix.
 *
 * Possible values:
 * - 'VALIDATING': The matrix is being validated.
 * - 'PENDING': The matrix is waiting for resources to become available.
 * - 'FINISHED': The matrix has terminated normally. This means that the matrix
 *   level processing completed normally, but individual executions may be in an
 *   ERROR state.
 * - 'ERROR': The matrix has stopped because it encountered an infrastructure
 *   failure.
 * - 'INVALID': The matrix was not run because the provided inputs are not
 *   valid. E.g. the input file is not of the expected type, or is
 *   malformed/corrupt.
 */
export declare type TestState = 'VALIDATING' | 'PENDING' | 'FINISHED' | 'ERROR' | 'INVALID';
/**
 * Outcome summary for a finished TestMatrix.
 *
 * Possible values:
 * - 'SUCCESS': The test matrix run was successful, for instance:
 *   - All the test cases passed.
 *   - Robo did not detect a crash of the application under test.
 * - 'FAILURE': The test run failed, for instance:
 *   - One or more test cases failed.
 *   - A test timed out.
 *   - The application under test crashed.
 * - 'INCONCLUSIVE': Something unexpected happened. The run should still be
 *   considered unsuccessful but this is likely a transient problem and
 *   re-running the test might be successful.
 * - 'SKIPPED': All tests were skipped, for instance:
 *   - All device configurations were incompatible.
 */
export declare type OutcomeSummary = 'SUCCESS' | 'FAILURE' | 'INCONCLUSIVE' | 'SKIPPED';
