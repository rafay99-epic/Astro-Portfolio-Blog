#!/bin/bash
bash -c "$(curl -fsSL $(curl -s https://api.github.com/repos/rafay99-epic/SnapRescue/releases/latest | grep 'tarball_url' | cut -d '"' -f 4) | tar -xz && cd rafay99-epic-SnapRescue-* && ./snaprescue.sh)"
