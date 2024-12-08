# **CHANGE LOG**

### **SEE MORE DETAILS ABOUT NEW FEATURES IN `README`**

---
## v2.0.0
Provided proper type defs to avoid `any` type as much as possible.
Removed `EventEmitter3` package and replaced with custom one.
## v1.0.8
Changed guards workflow. Now `onAllGuardsDenied` won't fire if there's no guard added in preparation stage.
Added `failedGuards` and `approvedGuards` arrays that are containing failed and approved guards class names, to give an ability to write more flexible logic in `onAllGuardsDenied`, `onAnyGuardDenied` and `onAnyGuardApproved` functions.
## v1.0.7
updated dependency packages versions
## v1.0.6
Hotfix for `eventemitter3` and `generate-unique-id` packages updated versions, which caused `v1.0.5` crash at start! (tested) 
## v1.0.5
Bundle build fixes and package upgrades
## v1.0.1
First version