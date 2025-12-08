import {gql} from "@apollo/client";

export const GET_REPAIR = gql`
    query GetRepair($repairId: UUID!) {
        repair(request:{repairId: $repairId}) {
            id,
            ticketNumber,
            conversationId,
            repairShop{
                id,
                name,
            },
            status,
            contactInfo{
              fullName,
              email,
              phoneNumber,
              preferredContactMethod
            },
            deviceInfo {
                deviceType,
                manufacturer,
                model,
                serialNumber
            },
            faultInfo {
                whenOccurred,
                howToReproduce,
                description,
                previouslyRepaired
            },
            returnInfo{
                returnMethod,
                returnAddress {
                    recipientName,
                    street,
                    buildingNumber,
                    apartmentNumber,
                    city,
                    postalCode,
                    country
                }
            },
            additionalComment
        }
    }
`