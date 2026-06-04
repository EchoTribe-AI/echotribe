---
name: index.html source of truth
description: index.html in the project root is the source of truth — never overwrite it from attached_assets/; also documents the server restart fix.
---

## Rule: Never overwrite index.html from attached_assets/

`attached_assets/` is a staging area for uploaded reference files only.
The root `index.html` is the live, source-of-truth file — it may have received edits after the upload.

**Why:** Multiple sessions overwrote root `index.html` by copying from `attached_assets/echotribe-landing_final.html`, reverting user edits made directly to the root file.

**How to apply:** If asked to "use this file" or "replace with this", read the attached file and apply targeted edits to the root file — never `cp attached_assets/X index.html`.

---

## Fix: Workflow restart fails with "Address already in use"

The workflow button in Replit UI can fail to restart if a zombie python process still holds port 5000.

**Why:** Python's `http.server` / `socketserver` leaves the port bound briefly after SIGTERM. Rapid restarts re-attempt binding before the OS releases it.

**Fix in server.py:** Uses `/proc/net/tcp` to find the inode for port 5000, walks `/proc/<pid>/fd` to find the owning PID, and sends SIGKILL before binding. This works without `lsof` or `ss` (neither available in this Nix sandbox).

**How to apply:** If the workflow fails with `OSError: [Errno 98] Address already in use`, run `ps -ef | grep "python.*server"` to find the PID, kill it with `kill -9 <PID>`, then restart the workflow.
