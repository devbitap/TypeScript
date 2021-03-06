/// <reference path='fourslash.ts' />

// @Filename: /export.ts
////const [|{| "isWriteAccess": true, "isDefinition": true |}foo|] = 1;
////export default [|foo|];

// @Filename: /re-export.ts
////export { [|{| "isWriteAccess": true, "isDefinition": true |}default|] } from "./export";

// @Filename: /re-export-dep.ts
////import [|{| "isWriteAccess": true, "isDefinition": true |}fooDefault|] from "./re-export";

const [r0, r1, r2, r3] = test.ranges();
verify.referenceGroups([r0, r1], [
    { definition: "const foo: 1", ranges: [r0, r1] },
    { definition: "import default", ranges: [r2], },
    { definition: "import fooDefault", ranges: [r3] },
]);
verify.referenceGroups(r2, [
    { definition: "import default", ranges: [r2] },
    { definition: "import fooDefault", ranges: [r3] },
    { definition: "const foo: 1", ranges: [r0, r1] },
]);
verify.referenceGroups(r3, [
    { definition: "import fooDefault", ranges: [r3] },
    { definition: "import default", ranges: [r2] },
    { definition: "const foo: 1", ranges: [r0, r1] },
]);
