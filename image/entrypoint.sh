#!/bin/bash

term_handler() {
   timestamp=$(date "+%m-%d-%Y %H:%M:%S")
   GRAY='\033[0;90m'
   YELLOW='\033[0;33m'
   NC='\033[0m'
   
   echo -e "${GRAY}<${timestamp}> ${GRAY}[Serenity] ${GRAY}[${YELLOW}Warning${GRAY}] ${RED}SIGTERM received, exiting...${NC}"
   exit 0
}

trap 'term_handler' SIGTERM

/serenity/start.sh &

wait $!
